create table group2tag
(
	id bigserial
		primary key,
	tech_tag_id bigint not null
		references tech_tag
			on update cascade on delete cascade,
	tag_group_id bigint not null
		references tag_group
			on update cascade on delete cascade,
	unique (tech_tag_id, tag_group_id)
);

comment on table group2tag is 'many group to many tag';

alter table group2tag owner to postgres;

