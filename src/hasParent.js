module.exports = (node, parent) => {
  while (node) {
    if (parents === node) {
      return true
    }
    node = node.parentElement
  }
  return false
}
