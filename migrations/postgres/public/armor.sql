create function armor(bytea) returns text
	immutable
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function armor(bytea) owner to postgres;

create function armor(bytea, text[], text[]) returns text
	immutable
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function armor(bytea, text[], text[]) owner to postgres;

