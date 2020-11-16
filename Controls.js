export default class Controls {
  constructor(scene) {
    this.scene = scene;
    this.arrows = this.scene.input.keyboard.createCursorKeys();

    this.wasd = {
      w: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    this.scene.input.gamepad.once('down', (pad, button, index) => {
      console.log('gamepad registered');
      this.gamepad = pad;
    });
  }

  left() {
    if(
      this.arrows.left.isDown || 
      this.wasd.a.isDown || 
      (this.gamepad && this.gamepad.left)
    ) {
      return true;
    }

    return false;
  }

  right() {
    if(
      this.arrows.right.isDown || 
      this.wasd.d.isDown || 
      (this.gamepad && this.gamepad.right)
    ) {
      return true;
    }

    return false;
  }

  up() {
    if(
      this.arrows.up.isDown || 
      this.wasd.w.isDown || 
      (this.gamepad && this.gamepad.up)
    ) {
      return true;
    }

    return false;
  }

  down() {
    if(
      this.arrows.down.isDown || 
      this.wasd.s.isDown || 
      (this.gamepad && this.gamepad.down)
    ) {
      return true;
    }

    return false;
  }
}