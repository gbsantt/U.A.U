package com.uau.backend.service;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class TurnoReferenciaTest {
    @Test void boundariesAndOvernightReferenceDate() {
        var t=new TurnoReferenciaService("06:00","12:00","18:00");
        assertEquals("16/11/2026 Noite",t.referencia(LocalDateTime.parse("2026-11-17T05:59:59")));
        assertEquals("17/11/2026 Manhã",t.referencia(LocalDateTime.parse("2026-11-17T06:00:00")));
        assertEquals("17/11/2026 Tarde",t.referencia(LocalDateTime.parse("2026-11-17T12:00:00")));
        assertEquals("17/11/2026 Noite",t.referencia(LocalDateTime.parse("2026-11-17T18:00:00")));
        assertEquals("17/11/2026 Noite",t.referencia(LocalDateTime.parse("2026-11-18T00:00:00")));
    }
    @Test void customizedScheduleAndInvalidOrder() {
        var t=new TurnoReferenciaService("07:00","13:00","19:00");
        assertEquals("Noite",t.nome(LocalDateTime.parse("2026-11-17T06:30:00")));
        assertThrows(IllegalArgumentException.class,()->new TurnoReferenciaService("12:00","06:00","18:00"));
        assertThrows(IllegalArgumentException.class,()->new TurnoReferenciaService("06:00","06:00","18:00"));
    }
}
