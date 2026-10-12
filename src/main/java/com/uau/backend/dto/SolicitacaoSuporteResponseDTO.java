package com.uau.backend.dto;
import com.uau.backend.entity.*;
import java.time.Instant;
public record SolicitacaoSuporteResponseDTO(Long id,String assunto,CategoriaSuporte categoria,String descricao,StatusSuporte status,Instant createdAt,Instant updatedAt,long version) {}
