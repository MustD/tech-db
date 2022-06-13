create table tech2tag
(
	id bigserial
		primary key,
	tech_id bigint not null
		references tech
			on update cascade on delete cascade,
	tag_id bigint not null
		references tech_tag
			on update cascade on delete cascade,
	unique (tech_id, tag_id)
);

comment on table tech2tag is 'tech and tag relation table';

alter table tech2tag owner to postgres;

