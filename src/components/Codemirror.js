/** Copyright © 2013-2020 DataYes, All Rights Reserved. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styled from 'styled-components';
import _ from 'lodash';
import 'codemirror/mode/python/python';
import { stockCode } from './strategy_code';

const refreshDebounce = _.debounce((editor) => {
  editor.refresh();
}, 300);

export default class extends Component {
  state = { isEdited: false };

  render() {
    const { code = '' } = this.props;
    // readOnly: 'nocursor' 可以禁用编辑框，但无法复制里面但代码
    const options = {
      lineNumbers: true,
      lineWrapping: 'wrap',
      mode: 'python',
    };

    if (this.editorInstance) {
      refreshDebounce(this.editorInstance);
    }

    return (
      <CodeMirrorWrapper>
        代码
        <CodeMirror
            options={options}
            value={stockCode}
            editorDidMount={(editor) => {
              this.editorInstance = editor;
              this.editorInstance.refresh();
            }}
          />
      </CodeMirrorWrapper>
    );
  }
}
const CodeMirrorWrapper = styled.div`
  .label {
    margin: 0 15px;
  }
  .react-codemirror2 {
    margin: 15px;
    border: solid 1px #d9d9d9;
  }
  .CodeMirror,
  .CodeMirror-scroll {
    height: ${(props) => props.minHeight || 'auto'};
    max-height: ${(props) => props.minHeight || '1000px'};
    min-height: ${(props) => props.minHeight || '400px'};
  }
  .CodeMirror-scroll {
    overflow-y: hidden;
    overflow-x: auto;
  }
`;
