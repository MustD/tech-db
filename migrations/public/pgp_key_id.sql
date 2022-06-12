create function pgp_key_id(bytea) returns text
	immutable
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function pgp_key_id(bytea) owner to postgres;

