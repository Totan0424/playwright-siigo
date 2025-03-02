module.exports = {
  default: {
    require: ["tests/step_definitions/*.js"],
    format: ["progress-bar"],
    paths: ["features/*.feature"],
    timeout: 60000, // ⬅️ Aumentar el tiempo de espera a 20s
  },
};
