function cutText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  text = text.slice(0, maxLength);
  if (text.endsWith(' ')) {
    return text.slice(0, text.length - 1) + '...';
  } else {
    return cutText(text, maxLength - 1);
  }
}

export default cutText;
