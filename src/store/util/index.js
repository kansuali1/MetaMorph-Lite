import ShapeShift from "../../lib/shapeshift-api";

/*
 * Init connection to SS Api
 */
var PUBLIC_API_KEY =
  "642e27dbe1c1daa0d7d60d16b895c55d20e97dda9b6c0b03196e65557d721868d36beb40100af5851404b39464e446019c42ff91d7034bc79cda60ce8eea7f0f";
const SS = new ShapeShift.ShapeShiftApi(PUBLIC_API_KEY);

export default SS;
