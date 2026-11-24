const horarioDeBrasilia = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
});

const minutosPorDia = 24 * 60;
const duracaoTrocaEmMinutos = 30;

export function emTrocaDeTurno(horarios: readonly string[], agora: Date) {
    const partes = horarioDeBrasilia.formatToParts(agora);
    const hora = Number(partes.find(parte => parte.type === "hour")?.value);
    const minuto = Number(partes.find(parte => parte.type === "minute")?.value);
    const minutosAtuais = hora * 60 + minuto;

    return horarios.some(horario => {
        const [inicioHora, inicioMinuto] = horario.split(":").map(Number);
        const inicio = inicioHora * 60 + inicioMinuto;
        const minutosDesdeInicio = (minutosAtuais - inicio + minutosPorDia) % minutosPorDia;
        return minutosDesdeInicio < duracaoTrocaEmMinutos;
    });
}
