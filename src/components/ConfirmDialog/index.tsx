import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType, IDialogProps } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as strings from 'PzlSPFxComponentsStrings';
import * as React from 'react';


export interface IConfirmActionDialogProps extends IDialogProps {
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

export interface IConfirmActionDialogState {
  /**
   * @todo Describe property
   */
  comment?: string;
}


export class ConfirmDialog extends React.Component<IConfirmActionDialogProps, IConfirmActionDialogState>  {
  public static defaultProps: Partial<IConfirmActionDialogProps> = { commentMinLength: 5 };

  constructor(props: IConfirmActionDialogProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<IConfirmActionDialogProps> {
    return (
      <Dialog
        hidden={false}
        onDismiss={this.props.onDismiss}
        dialogContentProps={{ type: DialogType.normal, title: this.props.title, subText: this.props.subText }}
        modalProps={{ isBlocking: false, ...this.props.modalProps }}>
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