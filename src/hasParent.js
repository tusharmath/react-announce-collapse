module.exports = (node, parent) => {
  while (node) {
    if (parent === node) {
      return true
    }
    node = node.parentElement
  }
  return false
}
