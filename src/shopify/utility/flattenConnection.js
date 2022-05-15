export default function flattenConnection(connection) {
  var _a;
  return ((_a = connection.edges) !== null && _a !== void 0 ? _a : []).map((edge) => edge.node);
}
