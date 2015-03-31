# Galileo Setup

This was a very painful process to go through. It took an entire weekend and
then some to even get the thing to boot in the way I wanted it to. Hopefully
this guide will work for you, but these are essentially the steps that I took to
get the environment set up on the Intel Galileo (Gen 2).

# Prerequisites

The firmware on the Galileo should be updated. I'm not sure the latest version
now, but using the [Arduino Software for
Galileo](http://www.intel.com/support/galileo/sb/CS-035101.htm) and a serial
cable, you should be able to update it no problem (I say no problem, but if I
remember right, we actually spent a lot of time getting this to work in the
first place). If you have issues with that, just look up the
[documenation](http://www.intel.com/content/www/us/en/do-it-yourself/downloads-and-documentation.html).

Although I'm going to go through step-by-step what you should do, you should be
comfortable using the Terminal. I'm doing this in a typical Mac Dev environment
(Virtual Box, Homebrew, `wget`, etc.), and I'm not going to cover how to do this
with Windows. That has it's own set of issues that I did not have time to
tackle. Use a Mac. There should be someone around that has one you can use.

I'm not sure how long this process would take from start to finish because I did
a bunch of these steps on different days (because it took that much trial and
error... but mostly error). I'll try to give estimates on times, but if you want
to get it done in one day, I would set apart a Saturday afternoon to do it.

# Hardware

You should have the hardware set up already, but if you have to replace or redo
the galileo, this is what you will need:

* **Ethernet Cable** - You need to be able to connect this directly to a router
* or ethernet port you have access to. I did this at home so it was easy. If you
* do it at school, you'll have a lot more difficulty getting the access you
* need.

* **Internet Access** - you'll be downloading a lot of software directly to the
* galileo. Having a router isn't enough, you'll need Internet Access

* **Micro SD Card with SD adapter** - This should already be there, but if
* you're starting from scratch, you'll need this. I believe it needs to be at
* least 4 GB, but I used a 32GB one.

Everything else should be there. We'll go over software as we go along.

# SD Card

The SD Card will run a bigger version of linux, built for the Galileo (I believe
it's called Yocto). It doesn't have `apt-get` so don't even try. I tried getting
several different versions of linux working, like a version of debian built for
the galileo, but there were so many things lacking, like an [easy way to
boot](http://sourceforge.net/p/galileodebian/wiki/How%20to%20Boot%20the%20image/)
the freakin' thing.

---

First thing you'll need to do is download the linux image from intel. I found it
at [this page](https://software.intel.com/en-us/node/530415) but you can
download it directly with

```bash
wget http://iotdk.intel.com/images/iot-devkit-latest-mmcblkp0.direct.bz2
```

Once that's downloaded, unzip it

```bash
bunzip2 iot-devkit-latest-mmcblkp0.direct.bz2
```

You should end up with a file names `iot-devkit-latest-mmcblkp0.direct`. This is
the disk image.

---

Now you need to figure out which domain your SD card is mounted under. Type in

```bash
diskutil list
```

You should get something like this:

```bash
/dev/disk0
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *751.3 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:          Apple_CoreStorage                         750.4 GB   disk0s2
   3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
/dev/disk1
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:                  Apple_HFS Macintosh HD           *750.1 GB   disk1
                                 Logical Volume on disk0s2
                                 27400A53-D5C6-4FAC-8CD8-73482A6F3980
                                 Unlocked Encrypted
/dev/disk2
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *8.0 GB     disk2
   1:                        EFI EFI                     209.7 MB   disk2s1
   2:                  Apple_HFS [Your SD Card Name]     7.7 GB     disk2s2
```

Look for your SD Card name in the spot where is says `[Your SD Card Name]` above
in your output. The, take note of the section that it's in `/dev/diskN` where
the `N` is the number it is attached to. The above example, the SD card is at
`/dev/disk2`. **Take note of this!** If you don't get the right number, you
could erase you're entire hard drive, or a different one. I would unplug all
other peripherals, eject the SD card, and put it back in. More than likely, it
will be at `/dev/disk2`, but it doesn't have to be. Just make sure you get the
right one.

Now, you'll want to unmount it. This does not mean eject. If you eject, you have
to start over and find the `/dev/diskN` again. To unmount the disk, use the
following:

```bash
diskutil unmountDisk /dev/diskN
```

where `N` is the number from the last step. Don't remove your SD card.

---

Now, we'll write the image to the SD card. Still in the directory of the linux
image from before, run the following (replace the N with the number from
before):

```bash
sudo dd bs=8m if=iot-devkit-latest-mmcblkp0.direct of=/dev/diskN
```

This won't print out any progress, and it will take a while. It took about 8 to
15 minutes for me. I don't know all the ins and outs of that command, but the
`if` argument is some kind of input, and `of` is the output. `bs` is how big
each block write is (in this case 8 megabytes), but I'm not sure what effect
that has on the process overall. I just followed (several) tutorials, and they
just had that value.

You can eject it, but we're not quite done with SD card yet. We'll put it back
in later.

---

<a name="ubuntu"></a>

Now that you have the SD card, you may notice that the root partition is only
about 1Gb. About 900Mb are filled with system files, so you're only left with
about 150Mb, which is not enough to install much of anything let alone the
whole project.

This is where I spent the most time, and what ultimately narrowed down which
flavor of linux I needed. The basic one that basically just runs to get the
Arduino connections up and running didn't have any of the software I needed
installed like `node`. The devkit one didn't have enough space (that's the next
step for us), and the debian one didn't boot in an easy way. Since we're doing
the devkit one, we need to expand the filesystem to use the remainder of the
disk. I got really good at writing disk images to the SD card because I redid it
so many times.

First, you'll want to have VirtualBox installed.

Next, download a .iso of the latest Ubuntu [found here](http://www.ubuntu.com/download/desktop).

After you've downloaded it, open up VirtualBox, and click on the `New` button at
the top.

In the next window, in the Name: box, type in `Ubuntu`. If it doesn't
pre-populate the next fields, the next fields should be `Type: Linux` and
`Version: Ubuntu (64-bit)` (or 32-bit if that's your arch type). Click
Continue.

The 512 Mb of RAM should be fine, but I bumped mine up to 4096 (1/4 of what my
system's max was). I figured it would need it for the process or whatever. Give
it what you can spare. This is only a temporary image. Go to the next step.

On the next step, I created a virtual hard drive. I left it at the 8.0 Gb
default.

For the Hard Drive File Type, I just left it as default.

For the Storage of physical Hard Drive, I left it at Dynamically allocated.

On the next step, I left everything and clicked on Create.

---

Next, you'll want to attach the Ubuntu .iso to the new virtual machine.

Select the Ubuntu virtual machine you just created and click on Settings.

Under the Storage Tab, Click on the "Controller: IDE" text, then click on the
"Add CD/DVD Device" symbol (looks like a round CD with a plus symbol).

Click on "Choose Disk", and select the Ubuntu .iso that you downloaded earlier.

Click on Ok to exit the settings, then you can click on start.

It will open up the virtual machine in a new window. It may be small. Let it
run and it will eventually get to a screen where you can choose to Try Ubuntu
or Install Ubuntu. Click Install Ubuntu. On the next screen, select Download
updates while installing, then click Continue. The next screen will ask to
erase disk and install ubuntu. That's what we want (because this is just a
virtual image, it won't actually delete any of your files), so click install
now. It will say something about it's partitions, and just click continue all
the way through, fill out your user info and such, until it goes through the
installation.

After installation, it will reboot, but it will throw an error telling you to
remove the installation disk. Just close the window (select "Power off the
machine").

---

Now that that's ready, we'll need to set up our SD card to be mounted within the
Ubuntu machine we just created. This is was a lot more complicated than I
thought it would be, and it is because Mac's treat the SD slot differently than
USB slots.

First, open up Disk Utility. You should see your SD card there, along with the
two Volumes. Unmount both of the Volumes (don't eject). Keep this window open
because Mac will automatically mount the image everyone once in a while. Just
unmount it if it mounts again, no bit deal, no need to restart (at least before
it mounts in Ubuntu)

For good measure, find the `/dev/diskN` thing again for the SD card.

Now we need to make the virtual disk that is linked to the SD card. VirtualBox
has a command to do that for us! I would `cd` into the `VirtualBox VMs` folder,
so you can keep track of the new file.

```bash
cd ~/VirtualBox\ VMs
sudo VBoxManage internalcommands createrawvmdk -filename ./sd-card.vmdk -rawdisk /dev/diskN
```

Remember to replace the N with the number you got.

Now we need to change the permissions on the `/dev/diskN` and the 'file' we just
created so that VirtualBox can access them.

```bash
sudo chmod 777 /dev/diskN
sudo chmod 777 ./sd-card.vmdk
```

Be sure to unmount the Volumes if they mounted again.

Now in VirtualBox, select the Ubuntu machine, and click on Settings. Go to the
Storage tab. Select "Controller: SATA", and click on the "Add Hard Disk" icon
(the rectangle with the plus symbol). Click on "Choose existing disk" and select
that `sd-card.vmdk`. Click all the "Open"s, "Ok"s and such until you get back to
the main Virtual Box screen.

Be sure to unmount the Volumes if they mounted again.

Now start the Ubuntu image. Login, and open up the Terminal. To open the
terminal, click on the big square in the top left, and type in Terminal. Select
Terminal from the list.

When the Terminal opens, type in `sudo apt-get install gparted` and continue to
install gparted (the disk repartitioning tool).

When that opens, select the SD drive in the top right corner, then select the
second partition, which should be around 1 GB. Figure out the software to make
it fill the rest of the SD card, or at least a good portion of it. That part
will take a while, maybe even an hour or two. Once it's done, safely shut down
the ubuntu machine.

---

You can now eject the SD card (whew!).

Make sure that the power cord is unplugged from the Galileo. Insert the MicroSD
into the Galileo. Connect the Ethernet Cable from the Galileo to the network.

Connect the Power Cable. After about 30 seconds to a minute, connect to your
router (192.168.1.x or 10.0.1.x) or wherever your router is located. Try to find
out the ip address of the galileo (hostname should be `galileo`). If you can't
find it, you could try ping all of the addresses in the block to try and find
it.

Once you find it, login to it by typing the following (replacing the ip address
with the one that you found):

```bash
ssh root@192.168.1.115
```

Woo hoo! You're logged in.

---

This next process takes a really (really) long time. Several hours long. It's
because you're going to build PostgreSQL from source on really low grade
hardware (compared to most computers nowadays).

First, download the latest version of Postgres. Find the latest version from
[here](http://www.postgresql.org/ftp/source/), click on the link, then on the
version that ends in `.tar.gz`, right click and copy the link address.

While still logged into the galileo, type in `wget ` (that's a space at the end)
and paste in the link address. You'll want to arrow over to the beginning of the
url where is says `https` and replace it with `http` so that wget can download
it. There's probably a better way to do it so that it's more secure, but this
is how I downloaded it.

Once that's downloaded, you'll want to untar it by typing (replacing the
filename with the one that you just downloaded):

```bash
tar -zxvf postgres-9.4.1.tar.gz
```

Now move to the directory that was just extracted.

```bash
cd postgres-9.4.1
```

This is where it gets time consuming. Type in the following commands one by one
and wait for the other ones to finish. Make sure your computer is set up to not
fall asleep, because you'll probably want to leave it for long periods of time.
So to be clear, don't just copy this next block and run it. Run each command
by itself, and wait for it to return to the command prompt.

```bash
./configure
make
su
make install
adduser postgres # this one will make you set a password. Remember this password
mkdir /usr/local/pgsql/data
chown postgres /usr/local/pgsql/data
su - postgres
/usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data
/usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data >logfile 2>&1 &
/usr/local/pgsql/bin/createdb survey
exit
exit
```

Takes a little while, doesn't it?

---

Now let's update `npm` and such.

```bash
npm install -g npm
npm install -g node-gyp
```

Get back to the home directory

```bash
cd ~
```

Clone the repository

```bash
git clone https://github.com/UVU-DigitalMedia/DGM-Survey-Dispenser.git
```

After that's done, it might be a good thing to reboot the machine. I've run into
several 'out of memory' issues when installing all of the rest of the
dependencies.

Move to the repository directory

```bash
cd DGM-Survey-Dispenser
```

Install the node modules. This will also take a long time. If it fails, delete
the `node_modules` directory and try again. You may need to reboot every once in
a while if you have to run `npm install` multiple times.

```bash
npm install
```

Next, you'll want to create your admin user. This can be done with the following
command:

```bash
NODE_ENV=production DB=postgres://postgres:[password from before]@127.0.0.1/survey npm run seed
```

It will prompt your for an email and password. You can run this as many times as
you wish in order to create many admin users, but once you get the app running,
you'll be able to create as many users as you would like.

Next, you should generate the ssl certificates. It would be great to have paid
ones, but for now, self-signed will have to do.

```bash
npm run ssl
```

For the host, just enter in the IP address that you'll be using. When it asks
about adding it to keychain access, just press `CTRL` + `c` to exit. That's only
for Mac setups.

---

To run the server, you'll want to use environment variables to set your
configuration options.

```bash
NODE_ENV=production DB=postgres://postres:[your postgres password]@127.0.0.1/survey HOST=https://[ip address] PORT=443 npm start
```

It will take a while to spin up, but it will come up.

```bash
/usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data
```
