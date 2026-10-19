package com.uau.backend.repository;
import com.uau.backend.entity.MensagemSuporte;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface MensagemSuporteRepository extends JpaRepository<MensagemSuporte,Long> {
    List<MensagemSuporte> findBySolicitacaoIdAndIdGreaterThanOrderByIdAsc(Long solicitacaoId,Long after);
}
