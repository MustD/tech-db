import {Stack, Typography} from "@mui/material";
import {ApolloError} from "@apollo/client";

export const ApolloErrorMessage = (
  {errors}: { errors: (ApolloError | undefined)[] }
) => {

  const notEmpty = (value: ApolloError | undefined): value is ApolloError => value !== undefined;
  const errorsNotNull: ApolloError[] = errors.filter(notEmpty)

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      {errorsNotNull.map((er) =>
        <Typography color={"darkred"} variant={"caption"}> Error message: {er.message} </Typography>
      )}
    </Stack>
  )
}
