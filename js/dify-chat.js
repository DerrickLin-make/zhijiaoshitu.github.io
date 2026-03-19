(function () {
    const config = window.DIFY_CONFIG || {};
    const state = {
        conversationId: '',
        isSending: false,
        userId: getUserId()
    };

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        const root = document.getElementById('difyChatApp');
        if (!root) {
            return;
        }

        renderShell(root);

        if (!config.baseUrl || !config.apiKey) {
            renderSystemMessage('未检测到 Dify 配置，请在 js/dify-config.local.js 中填写 baseUrl 和 apiKey。', true);
            setComposerDisabled(true);
            return;
        }

        bindEvents();
        renderSystemMessage('太白已接入新的 Dify 应用，你可以直接开始对话。');
    }

    function renderShell(root) {
        root.innerHTML = `
            <div class="chat-panel">
                <div class="chat-panel__header">
                    <div>
                        <div class="chat-panel__eyebrow">Dify Connected</div>
                        <h1 class="chat-panel__title">太白智能体</h1>
                    </div>
                    <button class="chat-panel__reset" id="chatResetButton" type="button">新建对话</button>
                </div>
                <div class="chat-panel__messages" id="chatMessages"></div>
                <form class="chat-panel__composer" id="chatComposer">
                    <textarea id="chatInput" placeholder="输入你的问题，获取朗读指导与文本分析。" rows="1"></textarea>
                    <button id="chatSendButton" type="submit">发送</button>
                </form>
            </div>
        `;
    }

    function bindEvents() {
        const form = document.getElementById('chatComposer');
        const input = document.getElementById('chatInput');
        const resetButton = document.getElementById('chatResetButton');

        form.addEventListener('submit', handleSubmit);
        input.addEventListener('input', autoResizeTextarea);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                form.requestSubmit();
            }
        });
        resetButton.addEventListener('click', resetConversation);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (state.isSending) {
            return;
        }

        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text) {
            return;
        }

        renderMessage('user', text);
        input.value = '';
        autoResizeTextarea();
        setComposerDisabled(true);

        const loadingId = renderTypingMessage();
        state.isSending = true;

        try {
            const payload = {
                inputs: {},
                query: text,
                response_mode: 'blocking',
                conversation_id: state.conversationId,
                user: state.userId
            };

            const response = await fetch(normalizeBaseUrl(config.baseUrl) + '/chat-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + config.apiKey
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            removeMessage(loadingId);

            if (!response.ok) {
                const message = data.message || data.error || ('请求失败，状态码 ' + response.status);
                throw new Error(message);
            }

            state.conversationId = data.conversation_id || state.conversationId;
            renderMessage('assistant', data.answer || '已收到请求，但没有返回文本内容。');
        } catch (error) {
            removeMessage(loadingId);
            renderSystemMessage('Dify 请求失败：' + error.message, true);
        } finally {
            state.isSending = false;
            setComposerDisabled(false);
            input.focus();
        }
    }

    function resetConversation() {
        state.conversationId = '';
        const messages = document.getElementById('chatMessages');
        messages.innerHTML = '';
        renderSystemMessage('已清空当前上下文，新的消息会开启一段新对话。');
    }

    function setComposerDisabled(disabled) {
        const input = document.getElementById('chatInput');
        const button = document.getElementById('chatSendButton');
        if (input) {
            input.disabled = disabled;
        }
        if (button) {
            button.disabled = disabled;
            button.textContent = disabled ? '发送中...' : '发送';
        }
    }

    function renderMessage(role, content) {
        const messages = document.getElementById('chatMessages');
        const item = document.createElement('article');
        item.className = 'chat-message chat-message--' + role;
        item.innerHTML = `
            <div class="chat-message__meta">${role === 'user' ? '你' : '太白'}</div>
            <div class="chat-message__body">${escapeHtml(content).replace(/\n/g, '<br>')}</div>
        `;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }

    function renderSystemMessage(content, isError) {
        const messages = document.getElementById('chatMessages');
        const item = document.createElement('div');
        item.className = 'chat-system-message' + (isError ? ' chat-system-message--error' : '');
        item.textContent = content;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }

    function renderTypingMessage() {
        const messages = document.getElementById('chatMessages');
        const item = document.createElement('article');
        const id = 'typing-' + Date.now();
        item.id = id;
        item.className = 'chat-message chat-message--assistant';
        item.innerHTML = `
            <div class="chat-message__meta">太白</div>
            <div class="chat-message__body chat-message__body--muted">正在思考...</div>
        `;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
        return id;
    }

    function removeMessage(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    }

    function autoResizeTextarea() {
        const input = document.getElementById('chatInput');
        if (!input) {
            return;
        }
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 180) + 'px';
    }

    function normalizeBaseUrl(url) {
        return String(url).replace(/\/$/, '');
    }

    function getUserId() {
        const storageKey = 'dify_chat_user_id';
        const existing = window.localStorage.getItem(storageKey);
        if (existing) {
            return existing;
        }
        const prefix = config.userIdPrefix || 'web-user';
        const generated = prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
        window.localStorage.setItem(storageKey, generated);
        return generated;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
})();
