const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
const req = require.context('./', true, /\.svg$/);

requireAll(req);
