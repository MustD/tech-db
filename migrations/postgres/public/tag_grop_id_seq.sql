create sequence tag_grop_id_seq;

alter sequence tag_grop_id_seq owner to postgres;

alter sequence tag_grop_id_seq owned by tag_group.id;

