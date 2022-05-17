import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {fontType, HabitWithUid, TimePeriod} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import {useUserContext} from '../utils/fn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from './CustomText';
import _ from 'lodash';

export interface SelectHabitsModal {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedHabits: HabitWithUid[];
  setSelectedHabits: React.Dispatch<React.SetStateAction<HabitWithUid[]>>;
}

export type HabitsCheckBox = HabitWithUid & {
  checked: boolean;
};

const SelectHabitsModal = ({
  isModalVisible,
  setModalVisible,
  selectedHabits,
  setSelectedHabits,
}: SelectHabitsModal) => {
  const tailwind = useTailwind();
  const {habits} = useUserContext();
  const [habitsList, setHabitsList] = useState<HabitsCheckBox[]>([]);

  useEffect(() => {
    const newHabitsList: HabitsCheckBox[] = habits
      .filter(habit => habit.timePeriod !== TimePeriod.Month)
      .map(habit => ({
        ...habit,
        checked: _.some(selectedHabits, habit),
      }));
    setHabitsList(newHabitsList);
  }, [habits, selectedHabits]);

  const handleModalSave = () => {
    const getCheckedHabits: HabitWithUid[] = habitsList
      .filter(habit => habit.checked)
      .map(({checked, ...properties}) => properties);
    setSelectedHabits(getCheckedHabits);
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          handleModalSave();
          setModalVisible(false);
        }}
        // useNativeDriver
        // hideModalContentWhileAnimating
        // onDismiss={handleModalSave}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={tailwind('bg-white p-7')}>
          <Text style={tailwind('text-2xl pb-3 font-YC_SemiBold')}>Habits</Text>
          {habitsList.length > 0 ? (
            <>
              {habitsList.map(habit => {
                return (
                  <View
                    key={habit.uid}
                    style={tailwind('flex-row mb-3 items-center')}>
                    <MaterialCommunityIcons
                      onPress={() => {
                        setHabitsList(prev => {
                          const newHabitsList = [...prev];
                          const index = newHabitsList.findIndex(
                            e => e.uid === habit.uid,
                          );
                          newHabitsList[index].checked =
                            !newHabitsList[index].checked;
                          return newHabitsList;
                        });
                      }}
                      name={
                        habit.checked
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      size={25}
                    />
                    <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
                      {habit.name}
                    </Text>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
              {'Add a habit first'}
            </Text>
          )}
          <CustomText
            font={fontType.Regular}
            size={16}
            additionStyle="text-center pt-2">
            *Only daily and weekly habits could be chosen
          </CustomText>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default SelectHabitsModal;
