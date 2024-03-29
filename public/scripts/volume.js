export const Volume = function() {

  this.audioPlayer = document.querySelector('.audio');
  this.volumeButton = document.querySelector('.volume-knob-indicator');
  this.radius	= this.volumeButton.offsetWidth / 2;
  this.centerX	= this.volumeButton.getBoundingClientRect().x + this.radius;
  this.centerY = this.volumeButton.getBoundingClientRect().y + this.radius;

  this.startAngle = 60;
  this.stopAngle = 60;
  this.mouseAngle = 60;

  const initVolume = () => {
    this.volumeButton.addEventListener('mousedown', startVolume, false);
    this.volumeButton.style.transform = `rotate(${this.startAngle}deg)`;
    this.audioPlayer.volume = this.startAngle / 360;
  }

  const bindEvents = () => {
    document.addEventListener('mousemove', trackVolume);
    document.addEventListener('mouseup', stopVolume);
  }

  const startVolume = event => {
    const { pageX, pageY } = event;
    this.startAngle = getVolumeAngle(pageX, pageY) - this.stopAngle;
    bindEvents();
  }

  const trackVolume = event => {
    const { pageX, pageY } = event;
    this.mouseAngle = getVolumeAngle(pageX, pageY) - this.startAngle;

    if (this.mouseAngle < 0) {
      this.mouseAngle = 360 - (-this.mouseAngle);
    }

    if (this.mouseAngle > 0) {
      const volume = this.mouseAngle < 360 ? this.mouseAngle / 360 : 1;
      this.audioPlayer.volume = volume;
    }

    this.volumeButton.style.transform =
      'rotate(' + this.mouseAngle + 'deg)';
  }

  const stopVolume = event => {
    const { pageX, pageY } = event;
    this.stopAngle = getVolumeAngle(pageX, pageY) - this.startAngle
    document.removeEventListener('mousemove', trackVolume);
  }

  const getVolumeAngle = (mouseX, mouseY) => {
    const x = mouseX - this.centerX;
    const y = mouseY - this.centerY;
    const radians	= Math.atan2(x, y);
    return Math.round((radians * (180 / Math.PI) * -1) + 100);
  }

  return {
    initVolume
  }
}