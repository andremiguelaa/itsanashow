import React from "react";
import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
});

const Markdown = ({ content }) => (
  <span dangerouslySetInnerHTML={{ __html: marked(content || "") }}></span>
);

export default Markdown;
