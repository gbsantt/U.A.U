package com.uau.backend.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** Reporting periods, not evidence that a staff handover occurred. */
@Service
public class TurnoReferenciaService {
    private final LocalTime manha, tarde, noite;
    public TurnoReferenciaService(
        @Value("${app.turnos.manha:06:00}") String manha,
        @Value("${app.turnos.tarde:12:00}") String tarde,
        @Value("${app.turnos.noite:18:00}") String noite) {
        this.manha=LocalTime.parse(manha); this.tarde=LocalTime.parse(tarde); this.noite=LocalTime.parse(noite);
        if(!this.manha.isBefore(this.tarde) || !this.tarde.isBefore(this.noite))
            throw new IllegalArgumentException("Os inícios dos turnos devem seguir a ordem manhã < tarde < noite.");
    }
    public String nome(LocalDateTime data) {
        var hora=data.toLocalTime();
        return hora.isBefore(manha)||!hora.isBefore(noite)?"Noite":hora.isBefore(tarde)?"Manhã":"Tarde";
    }
    public String referencia(LocalDateTime data) {
        var dia=data.toLocalDate();
        if(data.toLocalTime().isBefore(manha)) dia=dia.minusDays(1);
        return dia.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))+" "+nome(data);
    }
    public String horarios() {
        return "Manhã "+manha+"-"+tarde+" | Tarde "+tarde+"-"+noite+" | Noite "+noite+"-"+manha;
    }
}
