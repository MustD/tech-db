create function gen_random_uuid() returns uuid
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function gen_random_uuid() owner to postgres;

