import zoomSdk from '@zoom/appssdk';

// Continue with your existing Zoom SDK configuration code
(async () => {
    try {
        const configResponse = await zoomSdk.config({
            size: { width: 480, height: 360 },
            capabilities: [
                // Add Capabilities Here
                'shareApp',
                'getEmojiConfiguration',
                'setEmojiReaction',
            ],
        });

        console.debug('Zoom JS SDK Configuration', configResponse);
    } catch (e) {
        console.error(e);
    }
})();

async function getAvailableEmojis() {
    try {
        const emojiConfiguration = await zoomSdk.getEmojiConfiguration();
        return emojiConfiguration.emojis;
    } catch (error) {
        console.error('Error fetching available emojis:', error);
        return [];
    }
}

async function sendEmojiReaction(emojiCode) {
    try {
        await zoomSdk.setEmojiReaction({
            reactionType: emojiCode,
        });

        console.log('Emoji reaction sent successfully:', emojiCode);
    } catch (error) {
        console.error('Error sending emoji reaction:', error);
    }
}

// Fetch available emojis and display them in the app's UI
async function displayEmojis() {
    const emojis = await getAvailableEmojis();
    const appContainer = document.getElementById('app');

    emojis.forEach((emoji) => {
        const emojiButton = document.createElement('button');
        emojiButton.textContent = emoji.emoji;
        emojiButton.addEventListener('click', () => {
            sendEmojiReaction(emoji.code);
        });

        appContainer.appendChild(emojiButton);
    });
}

displayEmojis();
