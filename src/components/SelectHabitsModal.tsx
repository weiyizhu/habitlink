import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {FrequencyModalProps, HabitWithUid, TimePeriod} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import FrequencyRadioBtn from './FrequencyRadioBtn';
import {useUserContext} from '../utils/fn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Habit} from '../utils/models';

export interface SelectHabitsModal {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHabits: React.Dispatch<React.SetStateAction<HabitWithUid[]>>;
}

export type HabitsCheckBox = HabitWithUid & {
  checked: boolean;
};

const SelectHabitsModal = ({
  isModalVisible,
  setModalVisible,
  setSelectedHabits,
}: SelectHabitsModal) => {
  const tailwind = useTailwind();
  const {setSnackE, habits} = useUserContext();
  const initHabitsList: HabitsCheckBox[] = [];
  habits.forEach(habit => {
    if (habit.timePeriod !== TimePeriod.Month) {
      initHabitsList.push({
        ...habit,
        inCompetition: false,
        checked: false,
      });
    }
  });
  const [habitsList, setHabitsList] =
    useState<HabitsCheckBox[]>(initHabitsList);

  const handleModalSave = () => {
    const getCheckedFriends: HabitWithUid[] = habitsList
      .filter(habit => habit.checked)
      .map(({checked, ...properties}) => properties);
    setSelectedHabits(getCheckedFriends);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        // useNativeDriver
        // hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut"
        onDismiss={handleModalSave}
      >
        <View style={tailwind('bg-white p-7')}>
          {habitsList.length > 0 ? (
            <>
              {habitsList.map(habit => {
                return (
                  <View
                    key={habit.uid}
                    style={tailwind('flex-row mb-3 items-center')}
                  >
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
              {/* <Text
                style={tailwind('text-xl font-YC_Medium self-end mr-2')}
                onPress={handleModalSave}>
                Save
              </Text> */}
            </>
          ) : (
            <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
              {'You have no habits lol'}
            </Text>
          )}
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default SelectHabitsModal;
