import React, { ReactElement, useState } from "react";

interface ReadMoreProps {
  children: any[];
}

const ReadMore: React.FC<ReadMoreProps> = ({ children }) => {
  const text = children[1];

  const [isReadMore, setIsReadMore] = useState<boolean>(true);
  const toggleReadMore = (): void => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text" data-cy="comment">
      {children[0]}
      {isReadMore ? text?.slice(0, 120) : text}
      <span onClick={toggleReadMore} className="more">
        {text.length > 120 && (isReadMore ? "... more" : "")}
      </span>
    </p>
  );
};

export default ReadMore;
