const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");

const context = { exports: {} };
const source = ts.transpileModule(readFileSync("src/utils/trocaTurno.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
runInNewContext(source, context);
const { emTrocaDeTurno } = context.exports;

test("o aviso começa no horário de Brasília e termina após 30 minutos", () => {
    assert.equal(emTrocaDeTurno(["07:00"], new Date("2026-11-24T09:59:59Z")), false);
    assert.equal(emTrocaDeTurno(["07:00"], new Date("2026-11-24T10:00:00Z")), true);
    assert.equal(emTrocaDeTurno(["07:00"], new Date("2026-11-24T10:29:59Z")), true);
    assert.equal(emTrocaDeTurno(["07:00"], new Date("2026-11-24T10:30:00Z")), false);
});

test("o aviso continua após a meia-noite quando a troca começa no dia anterior", () => {
    const agora = new Date("2026-11-24T03:05:00Z");
    assert.equal(emTrocaDeTurno(["23:50", "07:00"], agora), true);
    assert.equal(emTrocaDeTurno([], agora), false);
    assert.equal(emTrocaDeTurno(["23:50"], new Date("2026-11-24T03:20:00Z")), false);
});
