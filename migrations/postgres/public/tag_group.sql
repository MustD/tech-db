create table tag_group
(
	id bigint default nextval('tag_grop_id_seq'::regclass) not null
		constraint tag_grop_pkey
			primary key,
	name text not null
);

comment on table tag_group is 'tag groups';

alter table tag_group owner to postgres;

