import media from "ui/styles/media";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledVideoCallTrigger = styled.div(
  () => css`
    overflow: hidden;
    background: #212242;

    .video-call {
      &-main {
        height: 100vh;
        overflow: hidden;
      }

      &-wrapper {
        display: flex;
        align-items: top;
      }

      &__header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0px;

        &-logo {
          margin-right: 24px;
        }

        &-title {
          font-family: "'Poppins', sans-serif";
          font-weight: 275;
          font-size: 30px;
          line-height: 38px;

          color: #000000;
        }
      }

      &-error {
        color: #f04438;
        align-self: flex-start;

        font-family: "'Poppins', sans-serif";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 38px;
      }

      &__images {
        &-leora-meditating {
          position: absolute;
          right: 8.33%;
          top: 15%;
          height: 40%;
          width: 589px;
          object-fit: contain;
        }

        &-cloud {
          &-top,
          &-middle,
          &-bottom {
            position: absolute;
          }

          &-top {
            width: 140px;
            height: 116px;
            right: 40.2%;
            top: 17.8%;
          }

          &-middle {
            width: 338px;
            height: 224px;
            right: -2.28%;
            top: 30%;
          }

          &-bottom {
            width: 507px;
            height: 338px;
            right: 33.8%;
            bottom: -10.46%;

            filter: blur(10.5px);
          }
        }
      }

      &-containervideo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 360px;
        width: 100%;
        height: 300px;
        background: rgba(252, 252, 253, 0.8);
        border: 1px solid #fcfcfd;
        backdrop-filter: blur(8px);
        border-radius: 50px;
        padding: 0px 36px;
        margin-left: 0px;
      }

      &-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 360px;
        width: 100%;
        height: 300px;
        background: rgba(252, 252, 253, 0.8);
        border: 1px solid #fcfcfd;
        backdrop-filter: blur(8px);
        border-radius: 50px;
        padding: 0px 36px;
        margin-left: 180px;
        z-index: 5;
      }

      &-title,
      &-subtitle {
        color: "#101828;";
        align-self: flex-start;
      }

      &-title {
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        line-height: 38px;
        margin-bottom: 12px;
      }

      &-subtitle {
        font-style: normal;
        font-weight: 400;
        font-size: "0.88rem";
        line-height: 21px;
        letter-spacing: "-0.02em";

        color: "#101828;";
        margin-bottom: 76px;
      }

      &-subtitle--error {
        margin-bottom: 38px;
      }

      &__form {
        width: 100%;

        &-icon-button {
          margin-right: -6px;
        }

        &-field-name {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.02em;
          color: "#101828;";
          margin-bottom: 6px;
        }

        &-email {
          margin-bottom: 20px;
        }

        &-password {
          margin-bottom: 50px;
        }

        &-textfield {
          fieldset {
            border-radius: 16px;
          }

          input {
            padding: 10px 14px;

            font-family: "'Poppins', sans-serif";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #121926;
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          }

          input::placeholder {
            color: #697586;
          }

          .MuiInputBase-root {
            background: #ffffff;
            border-radius: 16px;
          }

          .Mui-focused {
            outline: none;

            .MuiOutlinedInput-notchedOutline {
              box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
                0px 0px 0px 4px #f4ebff;
              border-width: 1px;
              outline: none;
            }
          }

          .Mui-error {
            .MuiOutlinedInput-notchedOutline {
              border-color: #fda29b;
              border-width: 1px;
              box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
            }
          }

          .Mui-disabled {
            background: #f8fafc;
            border-radius: 16px;
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          }

          .MuiFormHelperText-root {
            margin-left: 0px;
            margin-top: 6px;

            font-family: "'Poppins', sans-serif";
            font-style: normal;
            font-weight: 400;
            font-size: "0.88rem";
            line-height: 20px;
          }
        }

        &-login-button {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;

          color: #ffffff;
          padding: 12px 18px;
          background: linear-gradient(63.44deg, #4e45ff 16.72%, #cb6ce6 83.39%);
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          border-radius: 16px;
          border: none;
          width: 100%;
          cursor: pointer;
          text-transform: none;
        }

        &-login-button:disabled {
          background: #bebbff;
          border: 1px solid #bebbff;
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          border-radius: 16px;
          color: #ffffff;
        }

        &-login-img-plug {
          width: 50%;
          max-width: 433px;
          width: 100%;
          height: 680px;
        }
      }
    }

    ${media.min.mLg} {
      .video-call {
        &-wrapper {
          height: calc(100% - 100px);
          justify-content: space-evenly;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        &-container {
          margin-left: 0;
        }

        &__images {
          &-leora-meditating {
            top: 20%;
            right: 15%;
          }

          &-cloud {
            &-top {
              right: 38%;
              top: 40%;
            }

            &-middle {
              top: 50%;
              right: 5%;
            }
          }
        }
      }
    }

    ${media.max.lg} {
      .video-call {
        &-container {
          margin-left: 0;
        }

        &__images {
          &-leora-meditating {
            right: 0;
          }
        }
      }
    }

    ${media.max.md} {
      .video-call {
        &-wrapper {
          display: flex;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        &__form {
          &-login-img-plug {
            display: none;
          }
        }

        &-container {
          margin-left: 0;
        }

        &__header {
          margin-bottom: 50px;
        }

        &__images {
          &-leora-meditating {
            display: none;
          }

          &-cloud {
            &-top {
              top: 8%;
              right: 2.55%;
            }

            &-middle {
              display: none;
            }

            &-bottom {
              right: -8%;
              bottom: -1%;
            }
          }
        }
      }
    }

    ${media.max.sm} {
      padding: 24px 15px;
      width: calc(100% - 30px);

      .video-call {
        &__header {
          margin-bottom: 114px;

          &-title {
            font-size: 24px;
            line-height: 38px;
          }

          &-logo {
            margin-right: 18px;
          }
        }

        &-title,
        &-subtitle {
          align-self: center;
        }

        &-container {
          background: inherit;
          border: none;
          justify-content: flex-start;
          padding: 0;
        }

        &__images {
          &-cloud {
            &-top {
              top: 5.45%;
              right: -18%;
            }

            &-bottom {
              right: -55.5%;
            }
          }
        }
      }
    }

    .dashboard {
      &__metrics {
        display: flex;
        height: 100%;
        flex-direction: column;
        padding: 23px 21px 0 20px;
        width: 100%;

        background: #ffffff;
        border-radius: 10px;

        &-engaged-members {
          width: calc(100% - 65px);
          height: 300px;
          border: 1px solid #bf93ff;
          padding: 21px 29px;
          border-radius: 10px;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

          &-empty {
            &-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
            }

            &-loader {
              background: #e5e3ff;
              color: #bf93ff;
            }

            .MuiLinearProgress-bar1 {
              background: red;
              color: red;
            }
          }
        }
      }
    }

    .MuiLinearProgress-bar {
      background: #bf93ff;
    }
  `
);

export default StyledVideoCallTrigger;
