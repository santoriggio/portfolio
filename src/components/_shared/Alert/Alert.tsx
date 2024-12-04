import { FC, useCallback, useEffect, useRef } from "react";
import { Platform, View, useWindowDimensions } from "react-native";
import { Typography } from "../Typography";
import Button from "../Button/Button";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/hooks";
import { FullWindowOverlay } from "react-native-screens";
import { Icon } from "../Icon";
import { alertController } from "@/utils/controllers";

export type AlertProps = {};

export const AlertComponent: FC<AlertProps> = () => {
  const { visible, content, hide } = alertController();
  const { theme } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const Content = content && content.content;

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss({
        duration: 500,
      });
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        onPress={hide}
        appearsOnIndex={0}
      />
    ),
    [hide],
  );

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      enableDynamicSizing
      enablePanDownToClose
      maxDynamicContentSize={height * 0.7}
      backdropComponent={renderBackdrop}
      onDismiss={hide}
      // @ts-ignore
      containerComponent={Platform.OS === "ios" ? FullWindowOverlay : undefined}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.gray }}
    >
      {content && (
        <BottomSheetView
          style={{ paddingBottom: bottom, padding: theme.spacing.md }}
        >
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            {content.icon && (
              <Icon
                name={content.icon}
                size="xl"
                marginBottom="sm"
                {...content.iconProps}
              />
            )}
            <Typography
              size="lg"
              preset="bold"
              tx={content.title}
              style={{ textAlign: "center" }}
            />
            <Typography tx={content.message} style={{ textAlign: "center" }} />
            {Content && <Content />}
          </View>
          <Button
            marginTop="md"
            tx="common:ok"
            onPress={hide}
            {...content.positiveButtonProps}
          />
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

