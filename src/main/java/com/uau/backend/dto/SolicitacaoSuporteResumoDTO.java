package com.uau.backend.dto;
import com.uau.backend.entity.*;
import java.time.Instant;
public record SolicitacaoSuporteResumoDTO(Long id,String assunto,CategoriaSuporte categoria,StatusSuporte status,Instant createdAt,Instant updatedAt) {}
