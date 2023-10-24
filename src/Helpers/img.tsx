import React from "react";

export const getFullImageUrl = (url: string) => {
  const s3Url = process.env.REACT_APP_S3_URL;
  return `${s3Url + url}`;
};
export const getImageFilterClass = (filterName: string) => {
  return `filter-${filterName}`;
};
