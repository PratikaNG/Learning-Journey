## Basics



# Docker vs VM
	Ans: VM is very heavy. It is running an entire OS on top of an OS.
    Docker isn't like that, it runs an application on top of the system. It doesn't include the kernel. It just requires the application, enough of conf and enough of OS layer to run it bare min. It uses and interact with host kernel whenever it is required to do something. Ex: copy commands that runs in the host and moves into the container, that is when docker interacts with host.

# Commands
1. Docker pull <name>  - Pull any image
2. Docker ps - Shows all images/containers
3. Docker container prune - Removes all unused containers
4. Docker volume ls - Lists all the volumes
5. Docker container ls - Same as docker ps
6. Docker run --name give-a-name -p your-any-port:default port of the container -d imagename
    Ex: docker run --name my-mongodb-one -p 4000:27017 -d mongo
    if you run the docker ps, you will see the default port of the image.
7. Docker logs imagename or Docker logs CI
    Ex: Docker logs my-mongodb-one gives all the logs
8. Docker run imagename -a
    -a -> attach to the container and watch the output coming from it and print it
9. Docker start CID - Start a container
10. Docker container stop CID - Stops the CID mentioned -> let the docker do shutdown on its own time and do a clean up
11. Docker container kill CID - Stops the CID mentioned -> shutdown the process right now and no additional work.
12. Docker logs CID - To get the logs
13. Docker exec -it CID cmd - Execute an additional command in the terminal. They are actually 2 seperate tags. -i connects to stdin of the process and -t formats the terminal output.
14. Docker exec -it CID sh - Full terminal access inside the contest of the container. You can give bash/sh/zsh/powershell (any command processer). This will allow us to type commands in and have them be executed inside the container.
15. Docker build . - Gives our docker file to docker cli and it generates an image out of it


## How to write a Dockerfile
    - Step1: BaseImage
    - Step2: Install a software and configure that software
    - Step3: Set default commands



### Points to be noted
- Why docker ? : Docker makes it easy to install and run softwares without worrying about setup and dependencies
- Docker Ecosystem: Docker client, docker server, docker machine, docker images, docker hub, docker compose
- Image is a single file containing all the dependencies and all the configs required to run a very specific program
- Namespacing -  Segmenting a  hardware/software resources based on the process that is asking for it is known as namespacing. Isolating resources per process(or group of processes)
- Control groups -  Is used to limit the amount of resources(memory, CPU,hard drive input, input output, network bandwidth) used per process.
- Namespacing and control groups belong to Linux
- The dockerfile you write will be handed over to docker client and a custom image will be created.
