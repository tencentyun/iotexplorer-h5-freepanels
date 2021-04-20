import React from "react";
import "./RuyingLayout.less";

export interface RuyingLayoutProps {
  beforeChildren?: React.ReactNode;
  afterChildren?: React.ReactNode;
  displayName: string;
  wordsList: string[];
}

export function RuyingLayout({
  beforeChildren,
  wordsList,
  afterChildren,
  displayName,
}: RuyingLayoutProps) {




  return (
    <div className="ruying-page">
      {beforeChildren}
      <div className="voice-command-example">
        <div className="words-title">你还可以对{displayName}说： 爱迪生</div>
        {wordsList.map((item) => {
          return <div className="words-item">"{item}"</div>;
        })}
      </div>
      {afterChildren}
    </div>
  );
}
