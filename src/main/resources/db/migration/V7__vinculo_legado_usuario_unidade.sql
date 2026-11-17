-- Older Hibernate installations linked users to a unit through a column that
-- the current application no longer maps. Keep those users when a unit is deleted.
DO $$
DECLARE
    coluna smallint;
    vinculo record;
BEGIN
    SELECT attnum INTO coluna
    FROM pg_attribute
    WHERE attrelid = 'usuario'::regclass
      AND attname = 'unidade_atendimento_id' AND NOT attisdropped;

    IF coluna IS NOT NULL THEN
        ALTER TABLE usuario ALTER COLUMN unidade_atendimento_id DROP NOT NULL;

        FOR vinculo IN
            SELECT conname FROM pg_constraint
            WHERE conrelid = 'usuario'::regclass
              AND confrelid = 'unidade_atendimento'::regclass
              AND contype = 'f' AND conkey = ARRAY[coluna]::smallint[]
        LOOP
            EXECUTE format('ALTER TABLE usuario DROP CONSTRAINT %I', vinculo.conname);
        END LOOP;

        ALTER TABLE usuario ADD CONSTRAINT fk_usuario_unidade_legada
            FOREIGN KEY (unidade_atendimento_id) REFERENCES unidade_atendimento(id)
            ON DELETE SET NULL;
    END IF;
END $$;
