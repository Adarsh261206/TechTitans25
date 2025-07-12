import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const AskQuestionPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Ask a Question</h1>
      <Editor
        apiKey="h8uxgp4hqota3e6e3aidqjjzbpra1sqdwymo7a85396g42fz"
        initialValue="<p>Start writing your question details here...</p>"
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
            'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed',
            'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
            'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions',
            'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect',
            'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
            'link image media table mergetags | addcomment showcomments | spellcheckdialog ' +
            'a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | ' +
            'emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject('See docs to implement AI Assistant')
            ),
        }}
      />
    </div>
  );
};

export default AskQuestionPage;
