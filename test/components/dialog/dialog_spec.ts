import {
  beforeEach,
  describe,
  expect,
  inject,
  it,
  async
} from "@angular/core/testing";
import {ComponentFixture, TestComponentBuilder} from "@angular/compiler/testing";
import {Component, DebugElement, ViewContainerRef, ViewChild, ElementRef} from "@angular/core";
import {MdDialogRef, MdDialogConfig, MdDialog, MdDialogBasic} from "../../../ng2-material/components/dialog/dialog";
import {By} from "@angular/platform-browser";

export function main() {

  interface IDialogFixture {
    view: ViewContainerRef;
    fixture: ComponentFixture<TestComponent>;
    debug: DebugElement;
    elementRef: ElementRef;
  }

  @Component({
    selector: 'test-app',
    directives: [MdDialogBasic],
    template: `<div><template #test></template></div>`
  })
  class TestComponent {
    @ViewChild('test', {read: ViewContainerRef})
    view;
  }

  describe('Dialog', () => {
    let builder: TestComponentBuilder;
    let dialog: MdDialog;

    function setup(): Promise<IDialogFixture> {
      return new Promise<IDialogFixture>((resolve) => {
        builder.createAsync(TestComponent)
          .then((fixture: ComponentFixture<TestComponent>) => {
            fixture.detectChanges();
            let debug = fixture.debugElement.query(By.css('div'));
            return resolve({
              view: fixture.componentInstance.view,
              elementRef: fixture.elementRef,
              fixture: fixture,
              debug: debug
            });
          })
          .catch(console.error.bind(console));
      });
    }

    beforeEach(inject([TestComponentBuilder, MdDialog], (tcb, mdDialog) => {
      builder = tcb;
      dialog = mdDialog;
    }));

    describe('MdDialog', () => {
      describe('open', () => {
        it('should resolve with a reference to the dialog component instance', async(() => {
          setup().then((api: IDialogFixture) => {
            let config = new MdDialogConfig();
            return dialog.open(MdDialogBasic, api.view, config)
              .then((ref: MdDialogRef) => {
                expect(ref.instance).toBeAnInstanceOf(MdDialogBasic);
                return ref.close();
              });
          });
        }));
        it('should initialize default config if not specified', async(inject([], () => {
          setup().then((api: IDialogFixture) => {
            return dialog.open(MdDialogBasic, api.view)
              .then((ref: MdDialogRef) => ref.close());
          });
        })));
      });
      describe('close', () => {
        it('should return a promise that resolves once the dialog is closed', async(inject([], () => {
          setup().then((api: IDialogFixture) => {
            return dialog.open(MdDialogBasic, api.view)
              .then((ref: MdDialogRef) => ref.close());
          });
        })));
        it('should accept a value to resolve whenClosed with', async(inject([], () => {
          setup().then((api: IDialogFixture) => {
            return dialog.open(MdDialogBasic, api.view)
              .then((ref: MdDialogRef) => {
                ref.whenClosed.then((result) => {
                  expect(result).toBe(1337);
                });
                return ref.close(1337);
              });
          });
        })));
      });
    });

    describe('MdDialogBasic', () => {
      it('should open and close with promises', async(inject([], () => {
        setup().then((api: IDialogFixture) => {
          let config = new MdDialogConfig();
          return dialog
            .open(MdDialogBasic, api.view, config)
            .then((ref: MdDialogRef) => ref.close());
        });
      })));
    });
    describe('MdDialogConfig', () => {
      it('can set parent container', async(inject([], () => {
        setup().then(() => {
          let config = new MdDialogConfig().parent(document.body);
          expect(config.container).toBeAnInstanceOf(HTMLElement);
          expect(config.container.tagName.toLowerCase()).toBe('body');
        });
      })));
      it('can set targetEvent to specify dialog origin point', async(inject([], () => {
        setup().then(() => {
          let ev = document.createEvent('mouse');
          ev.type = 'click';
          let config = new MdDialogConfig().targetEvent(ev);
          expect(config.sourceEvent).toBe(ev);
        });
      })));
      it('should bind content options to component instance', async(inject([], () => {
        setup().then((api: IDialogFixture) => {
          let config = new MdDialogConfig()
            .textContent('Content')
            .title('Title')
            .ariaLabel('Aria')
            .ok('Ok')
            .cancel('Cancel')
            .clickOutsideToClose(false);
          return dialog.open(MdDialogBasic, api.view, config)
            .then((ref: MdDialogRef) => {
              let instance: any = ref.instance;
              expect(instance.textContent).toBe('Content');
              expect(instance.title).toBe('Title');
              expect(instance.ariaLabel).toBe('Aria');
              expect(instance.ok).toBe('Ok');
              expect(instance.cancel).toBe('Cancel');
            });
        });
      })));
    });

  });


}

