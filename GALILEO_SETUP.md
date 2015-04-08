[virtual-box]: http://www.oracle.com/technetwork/server-storage/virtualbox/downloads/index.html
[ubuntu]: http://www.ubuntu.com/download/desktop
[how-to-install-ubuntu]: http://lmgtfy.com/
[brew]: http://brew.sh/
[bonjour]: http://www.macupdate.com/app/mac/13388/bonjour-browser
[postgres]: http://www.postgresql.org/
[postgres-files]: http://www.postgresql.org/ftp/source/
[opencv]: http://opencv.org/

# Galileo Setup

This was a very painful process to go through. It took an entire weekend and
then some to even get the thing to boot in the way I wanted it to. Hopefully
this guide will work for you, but these are essentially the steps that I took to
get the environment set up on the Intel Galileo (Gen 2).

# Prerequisites

These prerequisites aren't necessarily required, but it is an outline of how my
setup was.

## Hardware

* **Intel Galileo (Gen2)** - This is assumed that you have, and it may work on
  the Gen1, but this tutorial was written while working on a Gen2. You should
  also have the servo set up and receiving input from pin 10.

* **USB Webcam** - This should also already be mounted to the setup.

* **Mac** - A Linux machine should be just fine as well. Technically, you could
  do all of the following on a windows machine, but that has its own set of
  caveats that you'll have to work through on your own. The only real solid
  requirements for your computer is that you'll need an SD card reader and
  access to the Internet. The tutorial, however, will assume you're on a Mac.

* **Router** - You should have access to a router with internet access. You'll
  need to connect the Galileo directly to this router.

* **Ethernet Cable** - You'll need a standard ethernet cable to connect the
  Galileo to your router.

* **Micro SD Card** - I haven't tested a wide variety of SD cards, but get a
  decent name branded one that's probably at least 8 Gb, but no more than 32 Gb.
  You'll need an SD card adapter in order to plug it into your computer.

## Software

* **[Virtual Box][virtual-box] with [Ubuntu][ubuntu]** - This is only needed if
  you're not already running a version of linux that can run `gparted`. If you
  don't know how to install Ubuntu into virtual box, this
  [link][how-to-install-ubuntu] should help you. It's free!

* **[Homebrew][brew]** - This is only for Mac, and isn't a hard requirement, but
  for any development done on a mac, many projects assume you already have it
  installed. For linux users, `brew` is linux's `apt-get`. Make sure your XCode
  is updated!

* **`wget`** - You could use curl, but `wget` gives you better progress when
  downloading files. You could also just download the needed files by clicking
  through links and links, but this will help you through the process a little
  bit quicker.

## Skills

* **Terminal** - Specifically in `bash`, but if you're comfortable in any other
  shell, you should be able to get by just fine. It's just important that you
  know you're way about your system using just terminal commands. If you don't,
  follow the instructions very carefully otherwise you could irrecoverably
  destroy your system.

* **Reformatting** - You should be comfortable reformatting hard drives and
  flash drives. Disk Utility is your friend.


# Installation

## SD Card Setup

1. If you have the SD card inserted, remove it. We'll insert it later.

1. Open up the terminal and enter the following to download and unzip the disk
  image:

  ```shell
  # Downloads the latest disk image from intel
  wget http://iotdk.intel.com/images/iot-devkit-latest-mmcblkp0.direct.bz2
  # unzips it
  bunzip2 iot-devkit-latest-mmcblkp0.direct.bz2
  ```

1. Find out which disk number the system assigns to the SD card.

  ```shell
  # Lists all of the mounted disks and stuff
  df -h
  ```

  Should output something like this:

  ```shell
  Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
  /dev/disk1     233Gi   68Gi  164Gi    30% 17885624 43099718   29%   /
  devfs          184Ki  184Ki    0Bi   100%      636        0  100%   /dev
  map -hosts       0Bi    0Bi    0Bi   100%        0        0  100%   /net
  map auto_home    0Bi    0Bi    0Bi   100%        0        0  100%   /home
  ```

  Now insert the SD card and run `df -h` again. Notice the last item listed. It
  may show something like:

  ```shell
  /dev/disk2s1
  /dev/disk2s2
  ```

  in the `Filesystem` column. Just remember the `/dev/diskN` where `N` is the
  number you need to remember.

1. Unmount the SD card. This does **not** mean eject. Do not eject. If you
  eject, you'll need to repeat the last step to make sure you have the write
  `/dev/diskN` number.

  To unmount, run the following command (be sure to replace the `N` with the
  number you remembered from the previous step):

  ```shell
  diskutil unmountDisk /dev/diskN
  ```

1. Write the disk image to the SD card.

  Enter the following command to write the disk image to the SD card be sure to
  replace the `N` with the number you remembered from the previous step. If you
  use the wrong one, you could destroy your entire system):

  ```shell
  dd bs=8m if=dd bs=8m if=iot-devkit-latest-mmcblkp0.direct of=/dev/diskN
  ```

  This may take a while. It took about 10 minutes to finish, and it doesn't have
  any sort of output telling you its progress.

1. Prepare SD card to be seen by Ubuntu. From what I've read, the newer versions
  of OS X don't make the SD card slot available like it used to, so we'll need
  to do some custom linking to make it available to VirtualBox.

  Run the following to create a virtual disk image that is linked to the SD
  card (remember to replace the `N` with the number from previous steps):

  ```shell
  sudo VBoxManage internalcommands createrawvmdk -filename ./sd-card.vmdk -rawdisk /dev/diskN
  # changes the permissions so VirtualBox can access them.
  sudo chmod 777 /dev/diskN
  sudo chmod 777 ./sd-card.vmdk
  ```

  Now in VirtualBox click on your Ubuntu Image, then click Settings > Storage.
  Click on 'Controller: SATA' and click on the 'Add Hard Disk' icon. Select
  'Choose existing Disk' and select the `sd-card.vmdk`, wherever it might be.

  Then click all of the `OK` and other confirmation buttons until you get out.

1. Resize the disk image. The disk image that you just got is only about 1 Gb,
  of that, the system files take up about 900 Mb. The remaining space is not
  enough to do anything with.

  Before you boot up Ubuntu, you'll need to unmount all of the partitions of the
  SD card (be sure to replace the `N` with the number from previous steps):

  ```shell
  diskutil unmountDisk /dev/diskN
  ```

  Boot up the Ubuntu image in VirtualBox and login. Once you're logged in, open
  up the terminal and run:

  ```shell
  sudo apt-get install gparted
  ```

  Once that's installed, run:

  ```shell
  sudo gparted
  ```

  That should start up a GUI that will allow you to resize the linux partition
  to fill the rest of the SD card. In the top right corner, select the second
  option, which should be your SD card. You'll notice a small partition
  (something around 50 Mb), and another one (just over 1 Gb). Select the 1 Gb
  partition and click on the resize icon. In the dialog, drag that second
  partition all the way to the edge, then click "Resize/Move", then click on the
  checkmark icon to apply the changes. This process takes a while, maybe around
  30 minutes to an hour.

  Once that is done, safely shut down Ubuntu. You can now go into the settings
  and remove that extra `sd-card.vmdk` from the SATA controllers. You can also
  delete the sd-card.vmdk file and eject (finally) the SD card.

## Galileo initialization

Now that you have your SD card all setup for the Galileo, we need to get all of
the software setup on the Galileo itself.

1. Connect Ethernet Cable from your router to the Galileo. Make sure the power
  cable for the Galileo is unplugged.

1. Insert Micro SD card into Galileo.

1. Plug the power into the Galileo.

1. Find out the ip address of the Galileo. Most routers will let you login to
  their interface and look up a DHCP table with all of the connected clients.
  Mine happened to have a DHCP lookup table, but not for non-wireless clients.

  I've used software just as [Bonjour Browser][bonjour], which lets you see
  other clients available over your network. The Galileo would should up under
  the 'SSH' section.

  There are many other tools out there, but if worse comes to worst, you could
  always try pinging every local ip until you get to one that isn't one of your
  wireless ones.

1. `ssh` into the Galileo using the ip address found in the previous step
  (replace `[ip address]` with the one found).

  ```shell
  ssh root@[ip address]
  ```

If it times out trying to ssh into the Galileo, or it never shows up in your
router's DHCP table, that means that it didn't boot, and something is wrong with
the SD card installation. If that's the case, you may need to start over. I've
been able to reproduce the installation process many times over without any
issues, so follow those steps to the T. If you still have issues, submit an
issue with your system information and any and all input/output from your
terminal (without including sensitive information) relating to your process.

## Galileo Setup

Now that we're up and running with the Galileo, we have the software that needs
to be installed, namely [PostgreSQL][postgres] (database) and [OpenCV][opencv]
(webcam interactions). OpenCV is supposedly already installed in some manner,
but not in a way that the node module we're using can interact with.

1. **OpenCV** - This will by far take the most amount of time. You will need to
  build OpenCV from source using the very light hardware that the Galileo
  provied. This process took upwards of 18 hours for me, and the first time, it
  failed. You'll want to have this run while you're at school or work and
  overnight.

  While logged into the Galileo, download OpenCV:

  ```shell
  wget http://downloads.sourceforge.net/project/opencvlibrary/opencv-unix/2.4.11/opencv-2.4.11.zip
  unzip opencv-2.4.11.zip
  rm opencv-2.4.11.zip
  ```

  Now, we'll need to setup the installation:

  ```shell
  cd opencv-2.4.11
  mkdir release
  cd release
  cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..
  ```

  That last command is setting up that `release/` directory to begin the
  installation process. That command should take a little bit to finish. Once
  that is done, I recommend rebooting the Galileo. The times that the next step
  has failed has been because it has run out of memory. Better to reboot now
  just to make sure the installation process won't run out of memory 12 hours
  in.

  ```shell
  reboot now
  ```

  After about a minute, you should be able to ssh into the machine again.

  ```shell
  ssh root@[ip address]
  ```

  Now move into the release directory again

  ```shell
  cd opencv-2.4.11/release
  ```

  This next command is the one that will take forever to run. Make sure that
  your computer doesn't lose the ssh connection or you'll never know when it
  will be done. Adjust your power saving settings to make sure your computer
  won't go to sleep, and inform anyone with access to the computer to not close
  the lid or shutdown or anything to the computer. For the overnight part, I
  just turned the display brightness all the way down, as well as the keyboard
  backlight. Anyway, you get the picture. Here we go:

  ```shell
  make
  ```

  That command (thankfully) will give you a progress update, even if it seems
  like it hangs for a while. For good memory measure, reboot again before you
  run the next command:

  ```shell
  reboot now
  ssh root@[ip address]
  cd opencv-2.4.11/release
  sudo make install
  ```

1. **PostgreSQL** - This process will also take a long while because you will
  be building from source. It will take much less time than OpenCV; it will
  probably take somewhere between 2-4 hours instead of 16-20 hours.

  It would probably be good to do another reboot:

  ```shell
  reboot now
  ssh root@[ip address]
  ```

  Next, download the zipped version of postgres:

  ```shell
  wget http://ftp.postgresql.org/pub/source/v9.4.1/postgresql-9.4.1.tar.bz2
  tar xvjf postgresql-9.4.1.tar.bz2
  ```

  If you want the most recent version of PostgreSQL, look at their
  [archive][postgres-files].

  Now we need to configure and install it

  ```shell
  cd postgresql-9.4.1
  ./configure
  make
  su # become super user
  make install
  adduser postgres # add postgres user
  # Take note of the password you create for the postgres user
  mkdir /usr/local/pgsql/data # make database directory
  chown postgres /usr/local/pgsql/data # change ownership
  su - postgres # assume postres user
  /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data # initialize database engine
  /usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data >logfile 2>&1 & # initialize postgres server
  /usr/local/pgsql/bin/createdb survey # Create survey database
  exit # logout of postgres user
  exit # logout of su
  ```

  Now that that's all done, you'll probably want to restart now:

  ```shell
  reboot now
  ssh root@[ip address]
  ```

1. **Node and App**

  First, let's update `npm` and `node-gyp`:

  ```shell
  npm install -g npm
  npm install -g node-gyp
  ```

  Now, let's clone the repo

  ```shell
  git clone https://github.com/UVU-DigitalMedia/DGM-Survey-Dispenser.git
  cd DGM-Survey-Dispenser
  ```

  Next, we'll install the dependencies:

  ```shell
  npm install --production
  ```

  Now you need to generate the self signed ssl certificates. When it asks about
  editing your keychain, just press `ctrl` + `c` to quit. Enter in the host
  name, or the ip address of the Galileo when prompted:

  ```shell
  npm run ssl
  ```

  Now start up postgres so that you can add in the default admin user

  ```shell
  su - postgres
  /usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data >logfile 2>&1 &
  exit
  ```

  Create the default admin user. The next command will prompt you for an email
  and password. It will create the admin user for you.

  ```shell
  npm run seed
  ```

1. **Startup files**

  In your home directory, create the `serverlog` file:

  ```shell
  touch serverlog
  chown postgres serverlog
  ```

  Also, create a `.profile` file:

  `.profile`

  ```shell
  export NODE_ENV=production
  export DB=postgres://postgres:[postgress password]@127.0.0.1/survey
  export HOST=https://[ip address]
  export PORT=443
  export PATH=$PATH:/usr/local/pgsql/bin
  ```

  Now we'll create the start and stop scripts

  `start.sh`

  ```shell
  #!/bin/sh

  su postgres -c '/usr/local/pgsql/bin/pg_ctl start -D /usr/local/pgsql/data -l serverlog'

  /home/root/DGM-Survey-Dispenser/node_modules/.bin/pm2 start /home/root/DGM-Survey-Dispenser/app.js
  ```

  `stop.sh`

  ```shell
  #!/bin/sh

  su postgres -c '/usr/local/pgsql/bin/pg_ctl stop -D /usr/local/pgsql/data -l serverlog'

  /home/root/DGM-Survey-Dispenser/node_modules/.bin/pm2 stop all
  ```

  Change the permissions for those files so that they can be executed:

  ```shell
  chmod a+x ./start.sh ./stop.sh
  ```

  Now you'll need to set the password for the root user:

  ```shell
  passwd
  ```

  After those files are create, reboot again.

  ```shell
  reboot now
  ```

# Post-installation

Now the Galileo is all setup! To start the server run the following:

```shell
ssh root@[ip address] /home/root/start.sh
```

To stop it (which you should do before you unplug anything), run the following:

```shell
ssh root@[ip address] /home/root/stop.sh
```
