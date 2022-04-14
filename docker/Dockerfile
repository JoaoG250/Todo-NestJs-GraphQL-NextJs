FROM node:16 as base

ARG USER=node
ARG WORKDIR=/home/${USER}/todoapp

USER ${USER}

# Setting up working directory
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

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
