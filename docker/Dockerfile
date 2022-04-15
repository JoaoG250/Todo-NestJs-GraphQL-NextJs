FROM node:16 as base

ARG USER=node
USER ${USER}

##### IMAGE : API #####
FROM base as api

ARG USER=node
ARG WORKDIR=/home/${USER}/todoapp

# Setting up working directory
RUN mkdir -p ${WORKDIR}/api
WORKDIR ${WORKDIR}/api

# Copying files
COPY --chown=${USER}:users ./api ./

# Copying entrypoint
USER root
COPY --chown=${USER}:users ./docker/api-entrypoint.sh /
RUN sed -i 's/\r//g' /api-entrypoint.sh
ENTRYPOINT ["sh", "/api-entrypoint.sh"]
USER ${USER}

##### IMAGE : NEXT #####
FROM base as next

ARG USER=node
ARG WORKDIR=/home/${USER}/todoapp

# Setting up working directory
RUN mkdir -p ${WORKDIR}/next
WORKDIR ${WORKDIR}/next

# Copying files
COPY --chown=${USER}:users ./next ./

# Copying entrypoint
USER root
COPY --chown=${USER}:users ./docker/next-entrypoint.sh /
RUN sed -i 's/\r//g' /next-entrypoint.sh
ENTRYPOINT ["sh", "/next-entrypoint.sh"]
USER ${USER}
