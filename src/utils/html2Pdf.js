/** Copyright © 2013-2020 DataYes, All Rights Reserved. */

import html2canvas from 'html2canvas';
import JsPdf from 'jspdf';

export default function(content, filename) {
  const container = document.createElement('canvas');
  const width = content.clientWidth;
  const height = content.clientHeight;
  const scale = 2;
  container.width = width * scale; // 定义canvas 宽度 * 缩放
  container.height = height * scale; // 定义canvas高度 *缩放
  container.style.width = `${content.clientWidth * scale}px`;
  container.style.height = `${content.clientHeight * scale}px`;
  const opts = {
    scale,
    width,
    height,
    useCORS: true,
    canvas: container,
  };

  html2canvas(content, opts).then((canvas) => {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;

    // 一页pdf显示html页面生成的canvas高度;
    const pageHeight = (contentWidth / 592.28) * 841.89;
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight;
    // 页面偏移
    let position = 0;
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28;
    const imgHeight = (592.28 / contentWidth) * contentHeight;

    const pageData = canvas.toDataURL('image/jpeg', 1.0);
    // var dom = document.createElement("a");
    // dom.href = pageData;
    // dom.download = new Date().getTime() + ".png";
    // dom.click();
    // return;

    const pdf = new JsPdf('', 'pt', 'a4');

    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        // 避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save(filename);
  });
}
