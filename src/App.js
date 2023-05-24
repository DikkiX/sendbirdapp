import "./styles.css";
import { SendBirdProvider, ChannelList, Channel } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChannelPreview from "./ChannelPreview";

export default function App() {
  const [channel, setChannel] = useState(null);

  const onChannelSelect = (_channel) => {
    setChannel(_channel);
    window.history.pushState({}, _channel.name, "/" + _channel.url);
  };

  const onBack = () => {
    setChannel(null);
    window.history.pushState({}, document.title, "/");
  };

  return (
    <div className="App">
      <SendBirdProvider
        userId="user2"
        appId="3CF98946-47C4-4ACD-8B9F-66D6B7237291"
      >
        {channel ? (
          <Channel
            channelUrl={channel.url}
            renderChatHeader={({ channel, user }) => (
              <ChatHeader channel={channel} user={user} onBack={onBack} />
            )}
          />
        ) : (
          <ChannelList
            renderChannelPreview={({ channel }) => (
              <ChannelPreview
                channel={channel}
                onChannelSelect={onChannelSelect}
              />
            )}
          />
        )}
      </SendBirdProvider>
    </div>
  );
}
