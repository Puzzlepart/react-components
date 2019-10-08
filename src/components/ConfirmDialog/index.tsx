import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType, IDialogProps } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as strings from 'PzlSPFxComponentsStrings';
import * as React from 'react';

export interface IConfirmDialogProps extends IDialogProps {
  /**
   * @todo Describe property
   */
  onConfirm: (comment?: string) => void;

  /**
   * @todo Describe property
   */
  onConfirmButtonText: string;

  /**
   * @todo Describe property
   */
  commentEnabled?: boolean;

  /**
   * @todo Describe property
   */
  commentMinLength?: number;
}

export interface IConfirmDialogState {
  /**
   * @todo Describe property
   */
  comment?: string;
}


export class ConfirmDialog extends React.Component<IConfirmDialogProps, IConfirmDialogState>  {
  public static defaultProps: Partial<IConfirmDialogProps> = { commentMinLength: 5 };

  constructor(props: IConfirmDialogProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<IConfirmDialogProps> {
    return (
      <Dialog
        hidden={false}
        onDismiss={this.props.onDismiss}
        dialogContentProps={{ type: DialogType.normal, title: this.props.title, subText: this.props.subText }}
        modalProps={{ isBlocking: false, ...this.props.modalProps }}
        containerClassName={this.props.containerClassName}>
        <div hidden={!this.props.commentEnabled}>
          <TextField
            placeholder={strings.CommentLabel}
            defaultValue={this.state.comment}
            multiline={true}
            autoAdjustHeight={true}
            onChange={this._onCommentChange.bind(this)} />
        </div>
        <DialogFooter>
          <PrimaryButton
            onClick={() => this.props.onConfirm(this.state.comment)}
            text={this.props.onConfirmButtonText}
            disabled={!this._onConfirmEnabled} />
          <DefaultButton onClick={this.props.onDismiss} text={strings.CloseText} />
        </DialogFooter>
      </Dialog>
    );
  }

  private _onCommentChange(_event: React.FormEvent<any>, comment: string) {
    this.setState({ comment });
  }

  private get _onConfirmEnabled() {
    if (!this.props.commentEnabled) return true;
    if (this.state.comment && this.state.comment.length >= this.props.commentMinLength) return true;
    return false;
  }
}

/**
 * Opens a confirm dialog
 * 
 * @param {string} title Dialog title
 * @param {string} subText Dialog sub text
 * @param {function} onConfirm On confirm action
 * @param {string} onConfirmButtonText On confirm button text
 * @param {React.Component} instance Instance of the component
 * @param {string} stateProperty Property to set in the state
 * @param {Partial<IConfirmActionDialogProps>} additionalProps Additional props 
 */
export function ConfirmAction(title: string, subText: string, onConfirm: (comment?: string) => Promise<void>, onConfirmButtonText: string, instance: React.Component, stateProperty: string = 'confirmActionProps', additionalProps: Partial<IConfirmDialogProps> = null) {
  instance.setState({
    [stateProperty]: {
      title,
      subText,
      onDismiss: () => {
        instance.setState({ confirmActionProps: null });
      },
      onConfirm: async (comment?: string) => {
        await onConfirm(comment);
        instance.setState({ confirmActionProps: null });
      },
      onConfirmButtonText,
      ...(additionalProps || {}),
    }
  });
}