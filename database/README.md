# Banco de dados do UAU

O sistema usa PostgreSQL e migrações Flyway. O esquema inicial está em [V1](../src/main/resources/db/migration/V1__schema_inicial.sql), e as evoluções em [db/migration](../src/main/resources/db/migration). A migração Java de hash das chaves está em [V3](../src/main/java/db/migration/V3__Hash_camera_keys.java).

Execute o backend para aplicar as migrações, seguindo o [README principal](../README.md#backend). Não copie nem execute manualmente migrations isoladas sobre bancos em uso. O Hibernate valida o esquema resultante.

As entidades Java estão em [entity](../src/main/java/com/uau/backend/entity). O DER acadêmico poderá ser incluído aqui pelo grupo. Não versionar dumps de produção, senhas, tokens ou dados de usuários.
