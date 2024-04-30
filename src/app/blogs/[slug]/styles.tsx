"use client";
export function BlogStyles() {
  return (
    <style jsx>{`
      /* Heading styles */
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 10px;
        color: #1b1b1f;
      }

      h1 {
        font-size: larger;
      }

      h2 {
        font-size: large;
      }

      h3 {
        font-size: medium;
      }

      p {
        color: #1b1b1f;
      }

      /* Paragraph styles */
      p {
        margin-bottom: 15px;
      }

      /* List styles */
      ul,
      ol {
        margin-bottom: 15px;
        margin-left: 20px;
      }

      /* Link styles */
      a {
        color: #000;
        text-decoration: none;
      }

      a:hover {
        color: #58126a;

        text-decoration: underline;
      }

      /* Image styles */
      img {
        max-width: 100%;
        height: auto;
      }

      /* Blockquote styles */
      blockquote {
        margin: 0 0 15px;
        padding: 0 0 0 15px;
        border-left: 5px solid #ccc;
      }

      /* Code block styles */
      pre {
        padding: 10px;
        background-color: #f8f9fa;
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: auto;
      }

      code {
        font-family: Consolas, Monaco, Courier New, monospace;
        font-size: 14px;
      }

      /* Table styles */
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }
    `}</style>
  );
}
