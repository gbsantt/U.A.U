package com.uau.backend.repository;

import com.uau.backend.entity.Favorito;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface FavoritoRepository
        extends JpaRepository<Favorito, Long> {


    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = "unidade")
    List<Favorito>
    findByUsuarioIdOrderByIdDesc(
            Long usuarioId
    );


    Optional<Favorito>
    findByUsuarioIdAndUnidadeId(
            Long usuarioId,
            Long unidadeId
    );


    boolean
    existsByUsuarioIdAndUnidadeId(
            Long usuarioId,
            Long unidadeId
    );


    void
    deleteByUsuarioIdAndUnidadeId(
            Long usuarioId,
            Long unidadeId
    );


    @org.springframework.data.jpa.repository.Modifying(flushAutomatically=true)
    @org.springframework.data.jpa.repository.Query("delete from Favorito f where f.unidade.id=:unidadeId")
    void
    deleteByUnidadeId(
            Long unidadeId
    );
}
