/*
 * @Author: wrq
 * @Date: 2021-10-02 09:01:31
 * @Description: 图标
 * 命名规则：五种不同的ui命名需要保持一致
 */
// import { SvgIcon } from '../../components/common';

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const req = require.context('./svg', true, /\.svg$/);

requireAll(req);
