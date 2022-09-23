function cutText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const cuttedText = text.slice(0, maxLength);

  if (cuttedText[cuttedText.length - 1] === ' ') {
    return `${cuttedText.slice(0, maxLength - 1)}...`;
  }
  return cutText(cuttedText.slice(0, maxLength), maxLength - 1);
}

export default cutText;
